import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { deleteResumeHistoryAPI, getResumeHistoryAPI } from '../services/allAPIs';
import { MdDelete } from "react-icons/md";

function History() {
  const [history, setHistory] = useState([]);

  const getHistory = async () => {
    try {
      const result = await getResumeHistoryAPI();
      console.log(result);
      setHistory(result.data);
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const deleteHistory = async (id) => {
    try {
      await deleteResumeHistoryAPI(id);
      getHistory(); // Refresh list after deletion
    } catch (err) {
      console.error('Error deleting history:', err);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div>
      <Typography variant="h4" align="center" my={4}>
        Resume Downloaded History
      </Typography>

      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        gap={4}
        px={2}
      >
        {history.length > 0 ? (
          history.map((item, index) => (
            <Paper
              key={index}
              elevation={6}
              sx={{
                width: 320,
                p: 2,
                position: "relative",
                borderRadius: 3,
              }}
            >
              <Button
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  minWidth: "auto",
                  padding: 0,
                }}
                onClick={() => deleteHistory(item.id)}
              >
                <MdDelete className="text-danger fs-4" />
              </Button>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                textAlign="center"
                mb={1}
                fontWeight="bold"
              >
                Review At:
                <br />
                {item.downloadedAt}
              </Typography>

              <Box
                sx={{
                  width: "100%",
                  height: 400,
                  overflow: "hidden",
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                <img
                  src={item.image}
                  alt="Resume preview"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
            </Paper>
          ))
        ) : (
          <Typography variant="body1" mt={5}>
            No history available
          </Typography>
        )}
      </Box>
    </div>
  );
}

export default History;
