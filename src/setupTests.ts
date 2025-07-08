import "@testing-library/jest-dom";

class MockClipboardEvent extends Event {
  clipboardData: DataTransfer | null;

  constructor(type: string, eventInitDict?: { clipboardData?: DataTransfer }) {
    super(type);
    this.clipboardData = eventInitDict?.clipboardData || null;
  }
}

global.ClipboardEvent = MockClipboardEvent as any;
