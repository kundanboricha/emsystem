import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from '@mui/material';
import Swal from 'sweetalert2';

export default function Index({ auth, events }) {
  const { data, setData, post, put, delete: destroy, reset, errors } = useForm({
    id: null,
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
  });

  const [open, setOpen] = useState(false);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });

  const openModal = (event = null) => {
    if (event) {
      setData({
        id: event.id,
        title: event.title,
        description: event.description || '',
        date: event.date,
        time: event.time || '',
        location: event.location || '',
      });
    } else {
      setData({
        id: null,
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
      });
    }
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  const submit = (e) => {
    e.preventDefault();
    if (data.id) {
      put(route('events.update', data.id), {
        onSuccess: () => {
          setOpen(false);
          Toast.fire({
            icon: 'success',
            title: 'Event updated successfully!',
          });
        },
        onError: () => {
          Toast.fire({
            icon: 'error',
            title: 'Failed to update event!',
          });
        },
      });
    } else {
      post(route('events.store'), {
        onSuccess: () => {
          setOpen(false);
          Toast.fire({
            icon: 'success',
            title: 'Event created successfully!',
          });
        },
        onError: () => {
          Toast.fire({
            icon: 'error',
            title: 'Failed to create event!',
          });
        },
      });
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This event will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        destroy(route('events.destroy', id), {
          onSuccess: () => {
            Toast.fire({
              icon: 'success',
              title: 'Event deleted successfully!',
            });
          },
          onError: () => {
            Toast.fire({
              icon: 'error',
              title: 'Failed to delete event!',
            });
          },
        });
      }
    });
  };

  const handlePageClick = (url) => {
    if (url) {
      router.visit(url);
    }
  };

  return (
    <AuthenticatedLayout user={auth.user}>
      <Head title="Manage Events" />

      <div className="container py-4">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <h1 style={{ margin: 0 }}>All Events</h1>

          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal()}
          >
            Add New Event
          </Button>
        </Box>

        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.data.length > 0 ? (
              events.data.map((ev) => (
                <tr key={ev.id}>
                  <td>{ev.title}</td>
                  <td>{ev.description}</td>
                  <td>{ev.date}</td>
                  <td>{ev.time}</td>
                  <td>{ev.location}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => openModal(ev)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => confirmDelete(ev.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No events found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
          {events.links.map((link, i) => (

            <Button
  key={i}
  variant={link.active ? 'contained' : 'outlined'}
  disabled={!link.url}
  onClick={() => handlePageClick(link.url)}
  size="small"
>
  <span dangerouslySetInnerHTML={{ __html: link.label }} />
</Button>


            // <Button
            //   key={i}
            //   variant={link.active ? 'contained' : 'outlined'}
            //   disabled={!link.url}
            //   onClick={() => handlePageClick(link.url)}
            //   dangerouslySetInnerHTML={{ __html: link.label }}
            //   size="small"
            // />
          ))}
        </Box>
      </div>

      {/* Modal */}
      <Dialog open={open} onClose={closeModal} maxWidth="sm" fullWidth>
        <DialogTitle>{data.id ? 'Edit Event' : 'Add New Event'}</DialogTitle>
        <DialogContent dividers>
          <Box
            component="form"
            id="event-form"
            onSubmit={submit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              label="Title"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              fullWidth
              margin="normal"
              required
              error={Boolean(errors.title)}
              helperText={errors.title}
            />

            <TextField
              label="Description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              fullWidth
              multiline
              rows={2}
              margin="normal"
              error={Boolean(errors.description)}
              helperText={errors.description}
            />

            <TextField
              label="Date"
              type="date"
              value={data.date}
              onChange={(e) => setData('date', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              required
              error={Boolean(errors.date)}
              helperText={errors.date}
            />

            <TextField
              label="Time"
              type="time"
              value={data.time}
              onChange={(e) => setData('time', e.target.value)}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={Boolean(errors.time)}
              helperText={errors.time}
            />

            <TextField
              label="Location"
              value={data.location}
              onChange={(e) => setData('location', e.target.value)}
              fullWidth
              margin="normal"
              error={Boolean(errors.location)}
              helperText={errors.location}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button type="submit" form="event-form" variant="contained">
            {data.id ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </AuthenticatedLayout>
  );
}
