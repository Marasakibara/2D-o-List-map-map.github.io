import React from 'react';
import deleteLogo from '../../assets/remove-icon.png';
interface PanelType {
  Logo?: string;
  Mode: string;
  item?: { title: string; text: string };
  errorPanel?: boolean;
  errorType?: string;
  onClickButton?: () => void;
  onChangeTitle?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeText?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClickErrorPanel?: (event: React.MouseEvent<HTMLImageElement>) => void;
}
const Panel: React.FC<PanelType> = ({
  Mode,
  Logo,
  onClickButton,
  onChangeTitle,
  onChangeText,
  item = { title: '', item: '' },
  onClickErrorPanel,
  errorPanel,
  errorType,
}) => {
  return (
    <div className="Panel">
      <div className="panelMode">{Mode}</div>
      <input
        onChange={onChangeTitle}
        type="text"
        maxLength={15}
        className="inputTitle"
        value={item.title}
        placeholder="Заголовок"></input>
      <input
        value={item.text}
        onChange={onChangeText}
        className="inputText"
        placeholder="Текст"></input>
      <img className="buttonimg" onClick={onClickButton} src={Logo} alt="CONFIRM"></img>
      {errorPanel && (
        <div className="errorPanel">
          {errorType}
          <img
            className="errorPanelConfirm"
            src={deleteLogo}
            onClick={onClickErrorPanel}
            alt="errorPanel"
          />
        </div>
      )}
    </div>
  );
};
export default Panel;
