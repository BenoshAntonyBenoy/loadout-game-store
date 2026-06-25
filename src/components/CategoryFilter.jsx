function CategoryFilter({ categories, active, onChange }) {
  const options = ['All', ...categories]

  return (
    <div className="category-filter">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          className={`chip ${active === option ? 'chip-active' : ''}`}
          onClick={() => onChange(option)}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default CategoryFilter
