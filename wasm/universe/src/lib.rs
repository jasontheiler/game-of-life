#![allow(unused_unsafe)]

mod utils;

use wasm_bindgen::prelude::*;
use web_sys::HtmlCanvasElement;

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum Cell {
    Dead,
    Alive,
}

#[wasm_bindgen]
pub struct Universe {
    canvas: HtmlCanvasElement,
    width: u32,
    height: u32,
    cells: Vec<Cell>,
}

#[wasm_bindgen]
impl Universe {
    #[wasm_bindgen(constructor)]
    pub fn new(canvas: HtmlCanvasElement, width: u32, height: u32) -> Universe {
        utils::set_panic_hook();

        let cells = (0..width * height)
            .map(|idx| {
                if idx % 2 == 0 || idx % 7 == 0 {
                    Cell::Alive
                } else {
                    Cell::Dead
                }
            })
            .collect();

        Universe {
            canvas,
            width,
            height,
            cells,
        }
    }

    #[wasm_bindgen(js_name = setSize)]
    pub fn set_size(&mut self, width: u32, height: u32) {
        self.width = width;
        self.height = height;
        self.cells = (0..width * height).map(|_| Cell::Dead).collect();
    }

    #[wasm_bindgen(js_name = toggleCell)]
    pub fn toggle_cell(&mut self, x: u32, y: u32) {
        let idx = self.get_index(x, y);

        self.cells[idx] = match self.cells[idx] {
            Cell::Alive => Cell::Dead,
            Cell::Dead => Cell::Alive,
        }
    }

    pub fn tick(&mut self) {
        let mut next = self.cells.clone();

        for row in 0..self.height {
            for col in 0..self.width {
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
    }

    fn live_neighbor_count(&self, row: u32, col: u32) -> u8 {
        let mut count = 0;

        let north = if row == 0 { self.height - 1 } else { row - 1 };
        let south = if row == self.height - 1 { 0 } else { row + 1 };
        let west = if col == 0 { self.width - 1 } else { col - 1 };
        let east = if col == self.width - 1 { 0 } else { col + 1 };

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
        (row * self.width + col) as usize
    }
}
