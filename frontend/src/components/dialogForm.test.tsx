import { render, fireEvent, screen } from '@testing-library/react';
import FormDialog from './dialogForm';

describe('FormDialog', () => {
  it('opens dialog when "Create New Task" button is clicked', async () => {
    const mockSetTasks = jest.fn();

    render(<FormDialog setTasks={mockSetTasks} />);
    const button = screen.getByText('Create New Task');

    await fireEvent.click(button);
    expect(screen.getByText('Fill all fields to add new task.'));
  });
});