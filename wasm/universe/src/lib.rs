#![allow(unused_unsafe)]

mod js;
mod utils;

use wasm_bindgen::prelude::*;
use web_sys::HtmlCanvasElement;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    canvas: HtmlCanvasElement,
    rows: u32,
    cols: u32,
    cells: Vec<Cell>,
    cell_size: u32,
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new(canvas: HtmlCanvasElement, width: u32, height: u32) -> Universe {
        utils::set_panic_hook();

        let cell_size = 10;

        canvas.set_width(width);
        canvas.set_height(height);

        let rows = (height - 1) / (cell_size + 1);
        let cols = (width - 1) / (cell_size + 1);
        let cells = (0..rows * cols)
            .map(|idx| {
                if idx == 4 {
                    Cell::Alive
                } else if idx == cols + 2 {
                    Cell::Alive
                } else if idx == cols + 4 {
                    Cell::Alive
                } else if idx == 2 * cols + 3 {
                    Cell::Alive
                } else if idx == 2 * cols + 4 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();

        Universe {
            canvas,
            rows,
            cols,
            cells,
            cell_size,
        }
    }

    /// Sets the canvas size and recalculates the number of rows and columns.
    ///
    /// Also kills all cells.
    #[wasm_bindgen(js_name = setSize)]
    pub fn set_size(&mut self, width: u32, height: u32) {
        self.canvas.set_width(width);
        self.canvas.set_height(height);

        self.rows = (height - 1) / (self.cell_size + 1);
        self.cols = (width - 1) / (self.cell_size + 1);
        self.cells = (0..self.rows * self.cols)
            .map(|idx| {
                if idx == 4 {
                    Cell::Alive
                } else if idx == self.cols + 2 {
                    Cell::Alive
                } else if idx == self.cols + 4 {
                    Cell::Alive
                } else if idx == 2 * self.cols + 3 {
                    Cell::Alive
                } else if idx == 2 * self.cols + 4 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.rows {
            for col in 0..self.cols {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                next[idx] = match (cell, live_neighbors) {
                    // Rule 1: Any live cell with fewer than two live neighbors dies, as if caused
                    // by underpopulation.
                    (Cell::Alive, x) if x < 2 => Cell::Dead,
                    // Rule 2: Any live cell with two or three live neighbors lives on to the next
                    // generation.
                    (Cell::Alive, 2) | (Cell::Alive, 3) => Cell::Alive,
                    // Rule 3: Any live cell with more than three live neighbors dies, as if by
                    // overpopulation.
                    (Cell::Alive, x) if x > 3 => Cell::Dead,
                    // Rule 4: Any dead cell with exactly three live neighbors becomes a live cell,
                    // as if by reproduction.
                    (Cell::Dead, 3) => Cell::Alive,
                    // All other cells remain in the same state.
                    (state, _) => state,
                };
            }
        }

        self.cells = next;

        self.draw_cells();
    }

    fn live_neighbor_count(&self, row: u32, col: u32) -> u8 {
        let mut count = 0;

        let north = if row == 0 { self.rows - 1 } else { row - 1 };
        let south = if row == self.rows - 1 { 0 } else { row + 1 };
        let west = if col == 0 { self.cols - 1 } else { col - 1 };
        let east = if col == self.cols - 1 { 0 } else { col + 1 };

        count += self.cells[self.get_index(north, west)] as u8;
        count += self.cells[self.get_index(north, col)] as u8;
        count += self.cells[self.get_index(north, east)] as u8;
        count += self.cells[self.get_index(row, west)] as u8;
        count += self.cells[self.get_index(row, east)] as u8;
        count += self.cells[self.get_index(south, west)] as u8;
        count += self.cells[self.get_index(south, col)] as u8;
        count += self.cells[self.get_index(south, east)] as u8;

        count
    }

    fn toggle_cell(&mut self, row: u32, col: u32) {
        let idx = self.get_index(row, col);

        self.cells[idx] = match self.cells[idx] {
            Cell::Alive => Cell::Dead,
            Cell::Dead => Cell::Alive,
        };

        self.draw_cells();
    }

    fn draw_grid(&self) {}

    fn draw_cells(&self) {
        let ctx = js::get_canvas_context_2d(&self.canvas);

        ctx.clear_rect(
            0 as f64,
            0 as f64,
            self.canvas.width() as f64,
            self.canvas.height() as f64,
        );

        ctx.begin_path();

        ctx.set_fill_style(&JsValue::from("#000000"));

        for row in 0..self.rows {
            for col in 0..self.cols {
                if let Cell::Dead = self.cells[self.get_index(row, col)] {
                    continue;
                }

                ctx.fill_rect(
                    (col * (self.cell_size + 1) + 1) as f64,
                    (row * (self.cell_size + 1) + 1) as f64,
                    self.cell_size as f64,
                    self.cell_size as f64,
                );
            }
        }

        ctx.stroke();
    }

    fn get_index(&self, row: u32, col: u32) -> usize {
        (row * self.cols + col) as usize
    }
}
