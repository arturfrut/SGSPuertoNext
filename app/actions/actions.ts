'use server'

export const submitAccidentReport = async (e: React.FormEvent, report: any) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/accidents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(report),
    });

    if (!response.ok) {
      throw new Error('Error creating accident report');
    }

    const data = await response.json();
    console.log('Accident report created successfully:', data);
  } catch (error) {
    console.error('Error creating accident report:', error);
  }
};