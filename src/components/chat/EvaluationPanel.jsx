import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  Divider,
  IconButton
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';
import EvaluatorService from '../../services/evaluatorService';

const EvaluationPanel = ({ evaluation, grade, objectId, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvaluation, setEditedEvaluation] = useState('');
  const [editedGrade, setEditedGrade] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (evaluation) {
      setEditedEvaluation(evaluation);
    }
    if (grade) {
      setEditedGrade(typeof grade === 'object' ? JSON.stringify(grade, null, 2) : String(grade));
    }
  }, [evaluation, grade]);

  const handleEdit = () => {
    setIsEditing(true);
    setError('');
    setSuccess('');
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedEvaluation(evaluation || '');
    setEditedGrade(grade ? (typeof grade === 'object' ? JSON.stringify(grade, null, 2) : String(grade)) : '');
    setError('');
    setSuccess('');
  };

  const handleSave = async () => {
    if (!objectId) {
      setError('Cannot update: evaluation not stored yet.');
      return;
    }

    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // Parse the grade if it's a JSON string
      let parsedGrade;
      try {
        parsedGrade = JSON.parse(editedGrade);
      } catch (e) {
        // If parsing fails, treat it as a plain object or string
        parsedGrade = editedGrade;
      }

      await EvaluatorService.updateEvaluation(
        objectId,
        editedEvaluation,
        parsedGrade
      );

      setSuccess('Evaluation updated successfully!');
      setIsEditing(false);
      
      // Notify parent component of the update
      if (onUpdate) {
        onUpdate(editedEvaluation, parsedGrade);
      }
    } catch (err) {
      console.error('Error updating evaluation:', err);
      setError('Failed to update evaluation. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!evaluation && !grade) {
    return (
      <Paper elevation={2} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <AssessmentIcon color="primary" />
          <Typography variant="h6">Evaluation</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
          No evaluation available yet. Continue chatting to receive evaluations.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', minHeight: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AssessmentIcon color="primary" />
          <Typography variant="h6">Evaluation</Typography>
        </Box>
        {!isEditing && (
          <IconButton size="small" onClick={handleEdit} color="primary">
            <EditIcon />
          </IconButton>
        )}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Evaluation
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              value={editedEvaluation}
              onChange={(e) => setEditedEvaluation(e.target.value)}
              variant="outlined"
              size="small"
            />
          ) : (
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                bgcolor: 'background.default',
                minHeight: 80,
                maxHeight: 200,
                overflow: 'auto'
              }}
            >
              <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {evaluation || 'No evaluation available'}
              </Typography>
            </Paper>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Grade
          </Typography>
          {isEditing ? (
            <TextField
              fullWidth
              multiline
              rows={4}
              value={editedGrade}
              onChange={(e) => setEditedGrade(e.target.value)}
              variant="outlined"
              size="small"
              placeholder='Enter grade as JSON object, e.g., {"score": 85, "feedback": "Good"}'
              helperText="Enter grade as a JSON object"
            />
          ) : (
            <Paper
              variant="outlined"
              sx={{
                p: 1.5,
                bgcolor: 'background.default',
                minHeight: 80,
                maxHeight: 200,
                overflow: 'auto'
              }}
            >
              <Typography
                variant="body2"
                component="pre"
                sx={{
                  fontFamily: 'monospace',
                  fontSize: '0.875rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: 0
                }}
              >
                {grade
                  ? typeof grade === 'object'
                    ? JSON.stringify(grade, null, 2)
                    : String(grade)
                  : 'No grade available'}
              </Typography>
            </Paper>
          )}
        </Box>
      </Box>

      {isEditing && (
        <Box sx={{ display: 'flex', gap: 1, mt: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            fullWidth
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleCancel}
            disabled={saving}
            fullWidth
          >
            Cancel
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default EvaluationPanel;

