import "@testing-library/jest-dom";
import { beforeAll, vi } from "vitest";

function mockMatchMedia() {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

beforeAll(() => {
  mockMatchMedia();
});

class MockClipboardEvent extends Event {
  clipboardData: DataTransfer | null;

  constructor(type: string, eventInitDict?: { clipboardData?: DataTransfer }) {
    super(type);
    this.clipboardData = eventInitDict?.clipboardData || null;
  }
}

global.ClipboardEvent = MockClipboardEvent as any;
