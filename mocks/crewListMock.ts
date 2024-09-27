export const mockTripulation = [
  {
    sailor_book_number: 12,
    name: 'Juan Pablo Perez',
    rol: 'Marinero',
    observationsNumber: 1, // Aca va función que mapea vencimientos
    documentsRegisterId: 4,
    sailorBookData: {
      sailor_book_first: '23/9/2024',
      renovation: '23/9/2024',
      medical_certification: '23/9/2024',
      cense: '23/9/2024',
      stcw: '23/9/2024'
    },
    politicsSigned: true, // Vencen todos en enero
    familiarizationSigned: true,
    protectionExpiration: '23/9/2024',
    expiration_controls: {
      sailor_book_first: '23/9/2024',
      renovation: '23/9/2024',
      medical_certification: '23/9/2024',
      cense: '23/9/2024',
      stcw: '23/9/2024'
    }
  },
  {
    sailor_book_number: 17,
    name: 'Roberto Dominici',
    rol: 'Oficial de máquinas',
    observationsNumber: 1,
    documentsRegisterId: 4,
    sailorBookData: {
      sailor_book_first: '23/9/2024',
      renovation: '23/9/2024',
      medical_certification: null,
      cense: null,
      stcw: null,
    },
    politicsSigned: true, // Vencen todos en enero
    familiarizationSigned: true,
    protectionExpiration: '23/9/2024',
    expiration_controls: {
      sailor_book_first: '23/9/2024',
      renovation: '23/9/2024',
      medical_certification: '23/9/2024',
      cense: null,
      stcw: null
    }
  },
  {
    sailor_book_number: 9,
    name: 'Juan Pablo Perez',
    rol: 'Marinero',
    observationsNumber: 1,
    documentsRegisterId: 4,
    provisory_card: {
      sailor_book_first: '23/9/2024',
      renovation: '23/9/2024',
      medical_certification: '23/9/2024',
      cense: '23/9/2024',
      stcw: '23/9/2024'
    },
    sailorBookData: {},
    politicsSigned: true, // Vencen todos en enero
    familiarizationSigned: true,
    protectionExpiration: '23/9/2024',
    expiration_controls: {
      sailor_book_first: '23/9/2024',
      renovation: '23/9/2024',
      medical_certification: '23/9/2024',
      cense: '23/9/2024',
      stcw: '23/9/2024'
    }
  }
]
