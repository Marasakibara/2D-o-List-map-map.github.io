import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export type item = {
  title: string;
  text: string;
  type?: string;
};
interface itemSliceType {
  items: item[];
}
export interface ReWriteItemType {
  oldItem: item;
  newItem: item;
}
export interface setCategoryType {
  title: string;
  type: string;
}
const initialState: itemSliceType = {
  items: [{ title: '', text: '', type: 'Завершённые' }] as item[],
};

export const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<item>) {
      const findItem = state.items.find((obj) => obj.title === action.payload.title);
      if (!findItem) {
        const title = action.payload.title;
        const text = action.payload.text;
        const type = action.payload.type;
        const item = { title, text, type } as item;
        state.items.push(item);
      }
    },
    removeItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.title === action.payload);
      if (findItem) {
        state.items = state.items.filter((obj) => obj.title !== action.payload);
      }
    },
    reWriteItem(state, action: PayloadAction<ReWriteItemType>) {
      state.items.map((obj, index) =>
        obj.title === action.payload.oldItem.title
          ? (state.items[index] = action.payload.newItem)
          : {},
      );
    },
    setCategoryItem(state, action: PayloadAction<setCategoryType>) {
      const index = state.items.findIndex((obj) => obj.title === action.payload.title);
      state.items[index].type = action.payload.type === 'Текущие' ? 'Завершённые' : 'Текущие';
    },
  },
});

export const { addItem, removeItem, reWriteItem, setCategoryItem } = itemSlice.actions;

export default itemSlice.reducer;
