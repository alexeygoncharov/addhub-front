export default function handleNumPaste(event: Event) {
  event.preventDefault();
  const clipboardData = (event as ClipboardEvent).clipboardData;
  if (!clipboardData) return;
  const text = clipboardData.getData('text');
  const pastedNumber = text.replace(/\D/g, '');
  const input = event.target as HTMLInputElement;
  const cursorPosition = input.selectionStart ? input.selectionStart : 0;
  const textBeforeCursor = input.value.substring(0, cursorPosition);
  const textAfterCursor = input.value.substring(
    input.selectionEnd ? input.selectionEnd : 0,
  );
  input.value = textBeforeCursor + pastedNumber + textAfterCursor;
}
