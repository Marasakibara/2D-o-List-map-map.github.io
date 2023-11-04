import React from 'react';

type CategoriesType = {
  value: string;
  setCategoryPanel: (type: string) => void;
};
const categories = ['Все', 'Текущие', 'Завершённые'];
const Categories: React.FC<CategoriesType> = React.memo(({ value, setCategoryPanel }) => {
  return (
    <div className="categories">
      <ul className="listCategoies">
        {categories.map((categoryName, index) => (
          <li
            key={categoryName}
            onClick={() => setCategoryPanel(categories[index])}
            className={value === categories[index] ? 'itemCategoiesactive' : 'itemCategoies'}>
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default Categories;
