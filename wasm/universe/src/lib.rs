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
    offset_x: u32,
    offset_y: u32,
    grid_color: String,
    cell_color: String,
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new(
        canvas: HtmlCanvasElement,
        width: u32,
        height: u32,
        cell_size: u32,
        grid_color: String,
        cell_color: String,
    ) -> Universe {
        utils::set_panic_hook();

        canvas.set_width(width);
        canvas.set_height(height);

        let rows = height / (cell_size + 1);
        let cols = width / (cell_size + 1);
        let cells = (0..rows * cols).map(|_| Cell::Dead).collect();
        let offset_x = (width % (cell_size + 1)) / 2;
        let offset_y = (height % (cell_size + 1)) / 2;

        let universe = Self {
            canvas,
            rows,
            cols,
            cells,
            cell_size,
            offset_x,
            offset_y,
            grid_color,
            cell_color,
        };

        Self::draw_grid(&universe);
        Self::draw_cells(&universe);

        universe
    }

    /// Sets the universe's size to the specified `width` and `height` and
    /// recalculates the number of rows and columns.
    ///
    /// **Also kills all cells.**
    ///
    /// # Examples
    ///
    /// ```ts
    /// const universe = new Universe(canvas, 512, 512, 16);
    /// universe.setSize(768, 256);
    /// ```
    #[wasm_bindgen(js_name = setSize)]
    pub fn set_size(&mut self, width: u32, height: u32) {
        self.canvas.set_width(width);
        self.canvas.set_height(height);
        self.rows = height / (self.cell_size + 1);
        self.cols = width / (self.cell_size + 1);
        self.cells = (0..self.rows * self.cols).map(|_| Cell::Dead).collect();
        self.offset_x = (width % (self.cell_size + 1)) / 2;
        self.offset_y = (height % (self.cell_size + 1)) / 2;

        self.draw_grid();
        self.draw_cells();
    }

    /// Sets the universe's cell size to the specified `size` and recalculates the
    /// number of rows and columns.
    ///
    /// **Also kills all cells.**
    ///
    /// # Examples
    ///
    /// ```ts
    /// const universe = new Universe(canvas, 512, 512, 16);
    /// universe.setCellSize(24);
    /// ```
    #[wasm_bindgen(js_name = setCellSize)]
    pub fn set_cell_size(&mut self, size: u32) {
        self.rows = self.canvas.height() / (size + 1);
        self.cols = self.canvas.width() / (size + 1);
        self.cells = (0..self.rows * self.cols).map(|_| Cell::Dead).collect();
        self.cell_size = size;
        self.offset_x = (self.canvas.width() % (size + 1)) / 2;
        self.offset_y = (self.canvas.height() % (size + 1)) / 2;

        self.draw_grid();
        self.draw_cells();
    }

    /// Toggles the cell at the specified `x` and `y` coordinates.
    ///
    /// # Examples
    ///
    /// ```ts
    /// const universe = new Universe(canvas, 512, 512, 16);
    ///
    /// universe.toggleCellAt(128, 256);
    ///
    /// // You need to manually redraw the cells afterwards.
    /// universe.drawCells("#000000");
    /// ```
    #[wasm_bindgen(js_name = toggleCellAt)]
    pub fn toggle_cell_at(&mut self, x: u32, y: u32) {
        let row = (y - self.offset_y) / (self.cell_size + 1);
        let col = (x - self.offset_x) / (self.cell_size + 1);

        if row >= self.rows || col >= self.cols {
            return;
        }

        let idx = self.get_index(row, col);

        self.cells[idx] = match self.cells[idx] {
            Cell::Alive => Cell::Dead,
            Cell::Dead => Cell::Alive,
        };

        self.draw_cell(row, col);
    }

    pub fn tick(&mut self) {
        let ctx = js::get_canvas_context_2d(&self.canvas);

        ctx.set_fill_style(&JsValue::from(&self.cell_color));

        let mut next_cells = self.cells.clone();

        for row in 0..self.rows {
            for col in 0..self.cols {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbor_count(row, col);

                next_cells[idx] = match (cell, live_neighbors) {
                    (Cell::Alive, x) if x > 3 || x < 2 => {
                        ctx.clear_rect(
                            (col * (self.cell_size + 1) + self.offset_x) as f64,
                            (row * (self.cell_size + 1) + self.offset_y) as f64,
                            self.cell_size as f64,
                            self.cell_size as f64,
                        );

                        Cell::Dead
                    }
                    (Cell::Dead, 3) => {
                        ctx.fill_rect(
                            (col * (self.cell_size + 1) + self.offset_x) as f64,
                            (row * (self.cell_size + 1) + self.offset_y) as f64,
                            self.cell_size as f64,
                            self.cell_size as f64,
                        );

                        Cell::Alive
                    }
                    (state, _) => state,
                };
            }
        }

        self.cells = next_cells;
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

    fn draw_grid(&self) {
        let ctx = js::get_canvas_context_2d(&self.canvas);

        ctx.begin_path();
        ctx.set_stroke_style(&JsValue::from(&self.grid_color));

        for i in 1..self.rows {
            let y = (i * (self.cell_size + 1) + self.offset_y) as f64;

            ctx.move_to(self.offset_x as f64, y);
            ctx.line_to(
                (self.cols * (self.cell_size + 1) + self.offset_x - 1) as f64,
                y,
            );
        }

        for i in 1..self.cols {
            let x = (i * (self.cell_size + 1) + self.offset_x) as f64;

            ctx.move_to(x, self.offset_y as f64);
            ctx.line_to(
                x,
                (self.rows * (self.cell_size + 1) + self.offset_y - 1) as f64,
            );
        }

        ctx.stroke();
    }

    fn draw_cells(&self) {
        for row in 0..self.rows {
            for col in 0..self.cols {
                self.draw_cell(row, col);
            }
        }
    }

    fn draw_cell(&self, row: u32, col: u32) {
        let ctx = js::get_canvas_context_2d(&self.canvas);

        match self.cells[self.get_index(row, col)] {
            Cell::Dead => {
                ctx.clear_rect(
                    (col * (self.cell_size + 1) + self.offset_x) as f64,
                    (row * (self.cell_size + 1) + self.offset_y) as f64,
                    self.cell_size as f64,
                    self.cell_size as f64,
                );
            }
            Cell::Alive => {
                ctx.set_fill_style(&JsValue::from(&self.cell_color));
                ctx.fill_rect(
                    (col * (self.cell_size + 1) + self.offset_x) as f64,
                    (row * (self.cell_size + 1) + self.offset_y) as f64,
                    self.cell_size as f64,
                    self.cell_size as f64,
                );
            }
        }
    }

    fn get_index(&self, row: u32, col: u32) -> usize {
        (row * self.cols + col) as usize
    }
}
