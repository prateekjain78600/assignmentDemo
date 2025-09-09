import React, { useState, useRef, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Grid,
  Card,
} from "@mui/material";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        text: `Bot: I understood "${input}". Tell me more!`,
        sender: "bot",
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1200);

    setInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Typography variant="h4">Chatbot</Typography>
        </Grid>
        <Grid size={12}>
          <Card sx={{ width: "100%", p: 2 }}>
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                mb: 2,
                p: 1,
                borderRadius: 2,
                bgcolor: "#fff",
                height: "200px",
                boxShadow: "inset 0 0 6px rgba(0,0,0,0.1)",
              }}
            >
              {messages.map((msg, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent:
                      msg.sender === "user" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "75%",
                      p: 1.2,
                      px: 2,
                      borderRadius: 2,
                      bgcolor: msg.sender === "user" ? "#1976d2" : "#e0e0e0",
                      color: msg.sender === "user" ? "#fff" : "#000",
                      boxShadow: 1,
                      fontSize: "14px",
                    }}
                  >
                    {msg.text}
                  </Box>
                </Box>
              ))}
              {loading && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <CircularProgress size={20} color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    Bot is typing...
                  </Typography>
                </Box>
              )}
              <div ref={messagesEndRef} />
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSend}
                disabled={loading}
              >
                Send
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Chatbot;
