import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Notification from '../src/components/notification/notification.jsx';

describe('Notification Component', () => {
  
  it('should render nothing when message is empty', () => {
    const { container } = render(<Notification message="" type="error" />);
    expect(container.firstChild).toBeNull();
  });

  it('should display the correct message and success icon', () => {
    render(<Notification message="Note saved!" type="success" />);
    
    expect(screen.getByText(/Note saved!/i)).toBeInTheDocument();
  });

  it('should apply the correct CSS class for error type', () => {
    render(<Notification message="Something went wrong" type="error" />);
    
    const alertBox = screen.getByRole('alert');

    expect(alertBox).toHaveClass('notification');
    expect(alertBox).toHaveClass('errorbox');
  });

  it('should apply the correct CSS class for success type', () => {
    render(<Notification message="Success!" type="success" />);
    
    const alertBox = screen.getByRole('alert');
    expect(alertBox).toHaveClass('successbox');
  });
});