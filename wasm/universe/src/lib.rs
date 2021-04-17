#![allow(unused_unsafe)]

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet(s: &str) {
    unsafe {
        alert(&format!("Hello, {}!", s));
    }
}
