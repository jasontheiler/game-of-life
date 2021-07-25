#![deny(nonstandard_style)]
#![warn(future_incompatible, rust_2018_idioms, unreachable_pub)]

mod utils;

use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::{CanvasRenderingContext2d, HtmlCanvasElement};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[repr(u8)]
enum Cell {
    Dead = 0,
    Alive = 1,
}

#[wasm_bindgen]
pub struct Universe {
    canvas: HtmlCanvasElement,
    ctx: CanvasRenderingContext2d,
    rows: u32,
    cols: u32,
    cells: Vec<Cell>,
    next_cells: Vec<Cell>,
    cell_size: u32,
    offset_x: u32,
    offset_y: u32,
}

#[wasm_bindgen]
impl Universe {
    /// Creates a new universe with the specified properties that will be drawn on
    /// the `canvas`.
    ///
    /// # Examples
    ///
    /// ```ts
    /// const universe = new Universe(canvas, 512, 512, 16, "#000");
    /// ```
    #[wasm_bindgen(constructor)]
    pub fn new(
        canvas: HtmlCanvasElement,
        width: u32,
        height: u32,
        cell_size: u32,
        cell_color: String,
    ) -> Universe {
        utils::set_panic_hook();

        canvas.set_width(width);
        canvas.set_height(height);

        let ctx = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<CanvasRenderingContext2d>()
            .unwrap();
        ctx.set_fill_style(&JsValue::from(&cell_color));

        let rows = height / cell_size;
        let cols = width / cell_size;
        let cells = vec![Cell::Dead; (rows * cols) as usize];
        let next_cells = cells.clone();
        let offset_x = (width % cell_size) / 2;
        let offset_y = (height % cell_size) / 2;

        Self {
            canvas,
            ctx,
            rows,
            cols,
            cells,
            next_cells,
            cell_size,
            offset_x,
            offset_y,
        }
    }

    /// Sets the universe's size to the specified `width` and `height` and
    /// recalculates the number of rows and columns.
    ///
    /// **Also kills all cells.**
    ///
    /// # Examples
    ///
    /// ```ts
    /// const universe = new Universe(canvas, 512, 512, 16, "#000");
    /// universe.setSize(768, 256);
    /// ```
    #[wasm_bindgen(js_name = setSize)]
    pub fn set_size(&mut self, width: u32, height: u32) {
        self.canvas.set_width(width);
        self.canvas.set_height(height);
        self.rows = height / self.cell_size;
        self.cols = width / self.cell_size;
        self.cells = vec![Cell::Dead; (self.rows * self.cols) as usize];
        self.next_cells = self.cells.clone();
        self.offset_x = (width % self.cell_size) / 2;
        self.offset_y = (height % self.cell_size) / 2;

        self.clear_canvas();
    }

    /// Sets the universe's cell size to the specified `size` and recalculates the
    /// number of rows and columns.
    ///
    /// **Also kills all cells.**
    ///
    /// # Examples
    ///
    /// ```ts
    /// const universe = new Universe(canvas, 512, 512, 16, "#000");
    /// universe.setCellSize(8);
    /// ```
    #[wasm_bindgen(js_name = setCellSize)]
    pub fn set_cell_size(&mut self, size: u32) {
        self.rows = self.canvas.height() / size;
        self.cols = self.canvas.width() / size;
        self.cells = vec![Cell::Dead; (self.rows * self.cols) as usize];
        self.next_cells = self.cells.clone();
        self.cell_size = size;
        self.offset_x = (self.canvas.width() % size) / 2;
        self.offset_y = (self.canvas.height() % size) / 2;

        self.clear_canvas();
    }

    /// Revives the cell at the specified `x` and `y` coordinates.
    ///
    /// # Examples
    ///
    /// ```ts
    /// const universe = new Universe(canvas, 512, 512, 16, "#000");
    /// universe.reviveCellAt(128, 256);
    /// ```
    #[wasm_bindgen(js_name = reviveCellAt)]
    pub fn revive_cell_at(&mut self, x: u32, y: u32) {
        let row = (y - self.offset_y) / self.cell_size;
        let col = (x - self.offset_x) / self.cell_size;

        if row >= self.rows || col >= self.cols {
            return;
        }

        let idx = self.get_index(row, col);

        self.cells[idx] = Cell::Alive;

        self.draw_cell(row, col);
    }

    /// Kills the cell at the specified `x` and `y` coordinates.
    ///
    /// # Examples
    ///
    /// ```ts
    /// const universe = new Universe(canvas, 512, 512, 16, "#000");
    /// universe.killCellAt(128, 256);
    /// ```
    #[wasm_bindgen(js_name = killCellAt)]
    pub fn kill_cell_at(&mut self, x: u32, y: u32) {
        let row = (y - self.offset_y) / self.cell_size;
        let col = (x - self.offset_x) / self.cell_size;

        if row >= self.rows || col >= self.cols {
            return;
        }

        let idx = self.get_index(row, col);

        self.cells[idx] = Cell::Dead;

        self.clear_cell(row, col);
    }

    /// Kills all cells.
    ///
    /// # Examples
    ///
    /// ```ts
    /// const universe = new Universe(canvas, 512, 512, 16, "#000");
    /// universe.killAllCells();
    /// ```
    #[wasm_bindgen(js_name = killAllCells)]
    pub fn kill_all_cells(&mut self) {
        self.cells.fill(Cell::Dead);

        self.clear_canvas();
    }

    /// Progresses the universe one tick.
    ///
    /// # Examples
    ///
    /// ```ts
    /// const universe = new Universe(canvas, 512, 512, 16, "#000");
    /// universe.tick();
    /// ```
    pub fn tick(&mut self) {
        for row in 0..self.rows {
            for col in 0..self.cols {
                let idx = self.get_index(row, col);
                let cell = self.cells[idx];
                let live_neighbors = self.live_neighbors(row, col);

                self.next_cells[idx] = match (cell, live_neighbors) {
                    (Cell::Alive, x) if x > 3 || x < 2 => {
                        self.clear_cell(row, col);

                        Cell::Dead
                    }
                    (Cell::Dead, 3) => {
                        self.draw_cell(row, col);

                        Cell::Alive
                    }
                    (state, _) => state,
                };
            }
        }

        self.cells.copy_from_slice(&self.next_cells);
    }

    fn live_neighbors(&self, row: u32, col: u32) -> u8 {
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

    fn get_index(&self, row: u32, col: u32) -> usize {
        (row * self.cols + col) as usize
    }

    fn draw_cell(&self, row: u32, col: u32) {
        self.ctx.fill_rect(
            (self.offset_x + col * self.cell_size) as f64,
            (self.offset_y + row * self.cell_size) as f64,
            self.cell_size as f64,
            self.cell_size as f64,
        );
    }

    fn clear_cell(&self, row: u32, col: u32) {
        self.ctx.clear_rect(
            (self.offset_x + col * self.cell_size) as f64,
            (self.offset_y + row * self.cell_size) as f64,
            self.cell_size as f64,
            self.cell_size as f64,
        )
    }

    fn clear_canvas(&self) {
        self.ctx.clear_rect(
            0.0,
            0.0,
            self.canvas.width() as f64,
            self.canvas.height() as f64,
        );
    }
}
