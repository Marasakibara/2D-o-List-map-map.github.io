import React from 'react';
import { useSelector } from 'react-redux';
import { RootType, UseAppDispatch } from '../../redux/store.ts';
import { addItem, item, removeItem, reWriteItem, setCategoryItem } from '../../redux/itemSlice.ts';

import addLogo from '../../assets/add-icon.jpg';
import confirmLogo from '../../assets/CONFIRM.png';
import indicatorLogo from '../../assets/indicator.png';
import deleteLogo from '../../assets/remove-icon.png';
import RewriteLogo from '../../assets/rewrite-icon.png';

import Categories from './categories/Categories.tsx';
import Panel from './Panel.tsx';

import '../../css/panel.css';

const ToDoList = () => {
  const dispatch = UseAppDispatch();
  const [openAddPanel, setOpenAddPanel] = React.useState(false);
  const [openReadPanel, setOpenReadPanel] = React.useState(false);
  const [rewriteMode, setRewriteMode] = React.useState(false);
  const [currentItem, setCurrentItem] = React.useState({} as item);
  const [rewritedItem, setRewritedItem] = React.useState({} as item);
  const [searchValue, setSearchValue] = React.useState('');
  const [errorPanel, setErrorPanel] = React.useState(false);
  const [errorType, setErrorType] = React.useState('???');
  const [typeCategoryPanel, setTypeCategoryPanel] = React.useState('Все');

  const items = useSelector((state: RootType) => state.itemSlice.items);
  const onClickAdd = () => {
    setCurrentItem({} as item);
    setOpenReadPanel(false);
    setErrorPanel(false);
    setRewriteMode(false);
    setOpenAddPanel(!openAddPanel);
  };
  const onChangeSearchBlock = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };
  const onChangeCategoryPanel = React.useCallback((type: string) => {
    setTypeCategoryPanel(type);
  }, []);
  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem({ title: event.target.value, text: currentItem.text, type: currentItem.type });
  };
  const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentItem({ title: currentItem.title, text: event.target.value, type: currentItem.type });
  };
  const onChangeRewritedTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRewritedItem({ title: event.target.value, text: rewritedItem.text, type: currentItem.type });
  };
  const onChangeRewritedText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRewritedItem({
      title: rewritedItem.title,
      text: event.target.value,
      type: currentItem.type,
    });
  };
  const onClickConfirm = () => {
    const findItem = items.find(
      (obj) => obj.title?.replaceAll(' ', '') === currentItem.title?.replaceAll(' ', ''),
    )?.title;
    if (currentItem.title?.replaceAll(' ', '') === '') {
      setErrorType('Запись пуста');
      setErrorPanel(true);
    } else if (!findItem) {
      dispatch(addItem({ ...currentItem, type: 'Текущие' }));
      setOpenReadPanel(false);
      setErrorPanel(false);
      setRewriteMode(false);
      setOpenAddPanel(false);
      setCurrentItem({} as item);
    } else {
      setErrorType('Запись с таким названием уже существует');
      setErrorPanel(true);
    }
  };
  const onClickListItems = (event: React.MouseEvent<HTMLDivElement>) => {
    const currentTitle: string = event.currentTarget.title;
    const i: item = items.find((obj) => obj.title === currentTitle) as item;
    setCurrentItem(i);
    setOpenAddPanel(false);
    setErrorPanel(false);
    setRewriteMode(false);
    setOpenReadPanel(true);
  };
  const onClickIndicator = (event: React.MouseEvent<HTMLImageElement>) => {
    dispatch(
      setCategoryItem({
        ...{ type: event.currentTarget.alt, title: event.currentTarget.title },
      }),
    );
  };
  const onClickRemoveItem = (event: React.MouseEvent<HTMLImageElement>) => {
    setOpenReadPanel(false);
    dispatch(removeItem(event.currentTarget.title));
    setOpenAddPanel(false);
  };
  const onClickReWriteMode = () => {
    setRewritedItem({ ...currentItem });
    setOpenReadPanel(false);
    setRewriteMode(true);
  };
  const onClickConfirmRewrite = () => {
    const oldItem = { ...currentItem };
    const newItem = { ...rewritedItem, type: 'Текущие' };
    const rewrited = {
      oldItem,
      newItem,
    };
    const findItem = items.find((obj) => obj.title === newItem.title)?.title;
    if (newItem.title.replaceAll(' ', '') === '') {
      setErrorType('Запись пуста');
      setErrorPanel(true);
    } else if (findItem) {
      setErrorType('Запись с таким названием уже существует');
      setErrorPanel(true);
    } else {
      dispatch(reWriteItem(rewrited));
      setRewriteMode(false);
    }
  };
  const changeErrorPanel = () => {
    setErrorPanel(!errorPanel);
  };
  const filteredItems = items
    .filter((obj) => obj.title?.toLowerCase().includes(searchValue))
    .filter((obj) => (typeCategoryPanel === 'Все' ? true : obj.type === typeCategoryPanel));

  const listitems = filteredItems.map((obj: item) => (
    <div key={obj.title}>
      {obj.title && (
        <img
          title={obj.title}
          className={obj.type === 'Текущие' ? 'indicatorActive' : 'indicatorCompleted'}
          src={indicatorLogo}
          onClick={onClickIndicator}
          alt={obj.type}
        />
      )}
      <b key={obj.title} title={obj.title} onClick={onClickListItems} className="item">
        {obj.title}
      </b>
      {obj.title && (
        <img
          title={obj.title}
          className="removeItemimg"
          onClick={onClickRemoveItem}
          src={deleteLogo}
          alt="deleteLogo"></img>
      )}
    </div>
  ));

  return (
    <div className="tdl">
      <div className="title-List">
        <img className="addimg" onClick={onClickAdd} src={addLogo} alt="addLogo" />
        <input
          className="searchBlock"
          onChange={onChangeSearchBlock}
          maxLength={30}
          value={searchValue}></input>
        <Categories value={typeCategoryPanel} setCategoryPanel={onChangeCategoryPanel} />
        Список дел:
        <div className="items-scrollbar">{listitems}</div>
      </div>
      {openAddPanel && (
        <Panel
          errorType={errorType}
          onClickErrorPanel={changeErrorPanel}
          errorPanel={errorPanel}
          item={currentItem}
          Mode="Добавить запись"
          onChangeTitle={onChangeTitle}
          onChangeText={onChangeText}
          onClickButton={onClickConfirm}
          Logo={confirmLogo}
        />
      )}
      {openReadPanel && (
        <Panel
          item={currentItem}
          Mode="Просмотр записи"
          onClickButton={onClickReWriteMode}
          Logo={RewriteLogo}
        />
      )}
      {rewriteMode && (
        <Panel
          errorType={errorType}
          onClickErrorPanel={changeErrorPanel}
          errorPanel={errorPanel}
          item={rewritedItem}
          Mode="Редактировать запись"
          onChangeTitle={onChangeRewritedTitle}
          onChangeText={onChangeRewritedText}
          onClickButton={onClickConfirmRewrite}
          Logo={confirmLogo}
        />
      )}
    </div>
  );
};
export default ToDoList;
