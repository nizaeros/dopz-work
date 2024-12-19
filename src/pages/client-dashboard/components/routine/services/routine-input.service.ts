import { MOCK_INPUTS } from './mock-data';
import type { RoutineInput, RoutineInputFilters, Activity } from '../types';
import { CheckCircle2, AlertCircle, XCircle, MessageSquare, Upload, Trash2 } from 'lucide-react';

export const routineInputService = {
  async getRoutineInputs(filters: RoutineInputFilters): Promise<RoutineInput[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let filteredInputs = [...MOCK_INPUTS];

    // Apply filters
    if (filters.status !== 'all') {
      filteredInputs = filteredInputs.filter(input => input.status === filters.status);
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredInputs = filteredInputs.filter(input => 
        input.docCode.toLowerCase().includes(searchLower) ||
        input.partyName.toLowerCase().includes(searchLower) ||
        input.notes?.toLowerCase().includes(searchLower)
      );
    }

    return filteredInputs;
  },

  async getInputActivities(inputId: string): Promise<Activity[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Mock activities
    return [
      {
        id: '1',
        type: 'status_change',
        description: 'Changed status to Verified',
        timestamp: '2024-02-09T11:30:00Z',
        user: 'John Doe',
        icon: CheckCircle2
      },
      {
        id: '2',
        type: 'document_upload',
        description: 'Uploaded new document: Invoice.pdf',
        timestamp: '2024-02-09T11:25:00Z',
        user: 'John Doe',
        icon: Upload
      },
      {
        id: '3',
        type: 'comment',
        description: 'Added comment: Please verify the amounts',
        timestamp: '2024-02-09T11:20:00Z',
        user: 'Jane Smith',
        icon: MessageSquare
      }
    ];
  },

  async updateInputStatus(id: string, status: RoutineInput['status']): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Status updated:', { id, status });
  },

  async updateBookKeeping(id: string, value: boolean): Promise<void> {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Book-keeping updated:', { id, value });
  }
};