import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useEffect, useState } from 'react';
import { Head } from '@inertiajs/react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography, Button, Container, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { format } from 'date-fns';
import { Chip } from '@mui/material'; // ✅ Add this with other imports
export default function Events() {
  const [events, setEvents] = useState({ today: [], future: [], past: [] });

  const fetchEvents = async () => {
    const res = await axios.get('/api/events');
    setEvents(res.data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4">Events</Typography>
        <Button variant="contained" onClick={fetchEvents}>Refresh</Button>
      </Box>

      {/* TODAY */}

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Today’s Events
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {events.today.length ? (
              events.today.map(ev => (
                <ListItem
                  key={ev.id}
                  disableGutters
                  sx={{
                    borderBottom: '1px solid #eee',
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                      {ev.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(ev.date), 'yyyy-MM-dd')}
                      {ev.time && ` • ${ev.time}`}  {/* ✅ show time if exists */}
                    </Typography>

                    {ev.location && (
                      <Typography variant="body2" color="text.secondary">
                        📍 {ev.location}
                      </Typography>
                    )}

                  </Box>
                  <Chip
                    label="Today"
                    color="primary"
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No events today" />
              </ListItem>
            )}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* FUTURE */}

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Future Events
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {events.future.length ? (
              events.future.map(ev => (
                <ListItem
                  key={ev.id}
                  disableGutters
                  sx={{
                    borderBottom: '1px solid #eee',
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {ev.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(ev.date), 'yyyy-MM-dd')}
                      {ev.time && ` • ${ev.time}`}  {/* ✅ show time if exists */}
                    </Typography>
                    {ev.location && (
                      <Typography variant="body2" color="text.secondary">
                        📍 {ev.location}
                      </Typography>
                    )}
                  </Box>
                  <Chip
                    label="Upcoming"
                    color="success" // you can pick color you like!
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No future events" />
              </ListItem>
            )}
          </List>
        </AccordionDetails>
      </Accordion>

      {/* PAST */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Past Events
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {events.past.length ? (
              events.past.map(ev => (
                <ListItem
                  key={ev.id}
                  disableGutters
                  sx={{
                    borderBottom: '1px solid #eee',
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#f9f9f9',
                    },
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {ev.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(ev.date), 'yyyy-MM-dd')}
                      {ev.time && ` • ${ev.time}`}  {/* ✅ show time if exists */}
                    </Typography>
                    {ev.location && (
                      <Typography variant="body2" color="text.secondary">
                        📍 {ev.location}
                      </Typography>
                    )}
                  </Box>
                  <Chip
                    label="Past"
                    color="default" // subtle grey
                    size="small"
                    sx={{ ml: 2 }}
                  />
                </ListItem>
              ))
            ) : (
              <ListItem>
                <ListItemText primary="No past events" />
              </ListItem>
            )}
          </List>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
}

Events.layout = page => (
  <AuthenticatedLayout>
    <Head title="Events" />
    {page}
  </AuthenticatedLayout>
);
