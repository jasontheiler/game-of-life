/// Provides better error messages in the browser's console if our code ever
/// panics.
///
/// See: https://github.com/rustwasm/console_error_panic_hook
pub fn set_panic_hook() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}
