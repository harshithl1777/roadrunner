const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid rgba(0, 33, 83, 0.15)',
      color: state.isSelected ? 'white' : '#000A18',
      backgroundColor: state.isSelected ? '#1968DD' : 'white',
      fontFamily: 'Inter',
      fontSize: '12px',
    }),
    control: (provided, state) => ({
      ...provided,
      borderRadius: '6px',
      border: state.selectProps.value ? '1px solid #1968DD' : '1px solid rgba(0, 33, 83, 0.15)',
      fontFamily: 'Inter',
      fontSize: '12px',
      color: '#1968DD',
      '&:hover': {
          border: state.selectProps.value ? '1px solid #1968DD' : '1px solid rgba(0, 33, 83, 0.15)' 
      }
    }),
    placeholder: (provided) => ({
        ...provided,
        fontFamily: 'Inter',
        color: 'rgba(0, 33, 83, 0.5)',
        fontSize: '14px'
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'rgba(0, 33, 83, 0.15)',
        '&:hover': {
            color: 'rgba(0, 33, 83, 0.15)'
        }
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        backgroundColor: 'rgba(0, 33, 83, 0.15)'
    })
  }

  export default customStyles;