import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import Chatbot from "../components/ChatBot";
import axios from "axios";

describe("Chatbot Component", () => {
  it("renders the chat button", () => {
    render(<Chatbot />);
    expect(screen.getByTestId("open-chat")).toBeInTheDocument();
  });

  it("opens and closes the chat window", async () => {
    render(<Chatbot />);
    const openChat = screen.getByTestId("open-chat");

    fireEvent.click(openChat);
    expect(screen.getByText(/AI Assistant Chatbot/i)).toBeInTheDocument();

    const closeChat = screen.getByTestId("close-chat");
    fireEvent.click(closeChat);

    expect(closeChat).not.toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByTestId("open-chat")).toBeInTheDocument();
    });
  });

  it("sends a message and receives a response", async () => {
    vi.mocked(axios.get).mockResolvedValue({
      data: { response: "Test bot response" },
    });

    render(<Chatbot />);
    const chatButton = screen.getByTestId("open-chat");
    fireEvent.click(chatButton);

    const inputElement = screen.getByPlaceholderText(/Type your message.../i);
    const sendButton = screen.getByRole("button", { name: /send/i });

    userEvent.type(inputElement, "Hello");
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(
        vi.mocked(axios.post).mockResolvedValue({
          response: "Test bot response",
        })
      ).toHaveBeenCalledTimes(1);
      // expect(mockedAxios.post).toHaveBeenCalledWith(expect.any(String), {
      //   message: "Test user message",
      // });
    });
  });

  // it("handles API errors with response data", async () => {
  //   axios.post = vitest.fn().mockRejectedValue({ request: {} });

  //   render(<Chatbot />);
  //   const chatButton = screen.getByRole("button", { name: /chat/i });
  //   fireEvent.click(chatButton);

  //   const inputElement = screen.getByPlaceholderText(/type your message/i);
  //   const sendButton = screen.getByRole("button", { name: /send/i });

  //   userEvent.type(inputElement, "Test user message");
  //   fireEvent.click(sendButton);

  //   await waitFor(() => {
  //     expect(screen.getByText("API Error")).toBeInTheDocument();
  //   });
  // });

  // it("handles network errors (no response)", async () => {
  //   axios.post = vitest.fn().mockRejectedValue({ request: {} });

  //   render(<Chatbot />);
  //   const chatButton = screen.getByRole("button", { name: /chat/i });
  //   fireEvent.click(chatButton);

  //   const inputElement = screen.getByPlaceholderText(/type your message/i);
  //   const sendButton = screen.getByRole("button", { name: /send/i });

  //   userEvent.type(inputElement, "Test user message");
  //   fireEvent.click(sendButton);

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("No response from the server.")
  //     ).toBeInTheDocument();
  //   });
  // });

  // it("handles generic errors (no response or data)", async () => {
  //   axios.post = vitest.fn().mockRejectedValue({ request: {} });
  //   // mockedAxios.post.mockRejectedValue({}); // Simulate generic error

  //   render(<Chatbot />);
  //   const chatButton = screen.getByRole("button", { name: /chat/i });
  //   fireEvent.click(chatButton);

  //   const inputElement = screen.getByPlaceholderText(/type your message/i);
  //   const sendButton = screen.getByRole("button", { name: /send/i });

  //   userEvent.type(inputElement, "Test user message");
  //   fireEvent.click(sendButton);

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText("An error occurred. Please try again later.")
  //     ).toBeInTheDocument();
  //   });
  // });

  // it("sends message with enter key", async () => {
  //   axios.post = vitest
  //     .fn()
  //     .mockResolvedValue({ data: { response: "Test bot response" } });

  //   render(<Chatbot />);
  //   const chatButton = screen.getByRole("button", { name: /chat/i });
  //   fireEvent.click(chatButton);

  //   const inputElement = screen.getByPlaceholderText(/type your message/i);
  //   userEvent.type(inputElement, "Test user message{Enter}");

  //   await waitFor(() => {
  //     expect(mockedAxios.post).toHaveBeenCalledTimes(1);
  //     expect(mockedAxios.post).toHaveBeenCalledWith(expect.any(String), {
  //       message: "Test user message",
  //     });
  //     expect(screen.getByText("Test bot response")).toBeInTheDocument();
  //     expect(screen.getByText("Test user message")).toBeInTheDocument();
  //   });
  // });

  // it("does not send empty messages", async () => {
  //   render(<Chatbot />);
  //   const chatButton = screen.getByRole("button", { name: /chat/i });
  //   fireEvent.click(chatButton);

  //   const inputElement = screen.getByPlaceholderText(/type your message/i);
  //   const sendButton = screen.getByRole("button", { name: /send/i });

  //   userEvent.type(inputElement, "   "); // Type only spaces
  //   fireEvent.click(sendButton);

  //   expect(mockedAxios.post).not.toHaveBeenCalled();
  //   expect(screen.queryByText("   ")).not.toBeInTheDocument();
  // });

  // it("displays loading indicator while waiting for response", async () => {
  //   axios.post = vitest
  //     .fn()
  //     .mockResolvedValue({ data: { response: "Test bot response" } });

  //   render(<Chatbot />);
  //   const chatButton = screen.getByRole("button", { name: /chat/i });
  //   fireEvent.click(chatButton);

  //   const inputElement = screen.getByPlaceholderText(/type your message/i);
  //   const sendButton = screen.getByRole("button", { name: /send/i });

  //   userEvent.type(inputElement, "Test user message");
  //   fireEvent.click(sendButton);

  //   expect(screen.getByText("Loading...")).toBeVisible();
  //   await waitFor(() => {
  //     expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
  //   });
  // });

  // it("disables the send button while loading", async () => {
  //   axios.post = vitest
  //     .fn()
  //     .mockResolvedValue({ data: { response: "Test bot response" } });

  //   render(<Chatbot />);
  //   const chatButton = screen.getByRole("button", { name: /chat/i });
  //   fireEvent.click(chatButton);

  //   const inputElement = screen.getByPlaceholderText(/type your message/i);
  //   const sendButton = screen.getByRole("button", { name: /send/i });

  //   userEvent.type(inputElement, "Test user message");
  //   fireEvent.click(sendButton);

  //   expect(sendButton).toBeDisabled();
  //   await waitFor(() => {
  //     expect(sendButton).not.toBeDisabled();
  //   });
  // });
});
