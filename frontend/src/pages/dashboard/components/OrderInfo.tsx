import { Turn } from '@/models/turns.type';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faCheck, faQrcode } from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/dashboard.module.css';
import { useCallback, useEffect, useRef, useState } from 'react';
import QrModal from './QrModal';

interface props {
  order: Turn;
  handleFinishTurn: (order: Turn) => void;
  setIsUpdate: (order: Turn) => void;
  deleteOrder: (order: Turn) => void;
}
const SECOND = 1000;
const MINUTE = SECOND * 60;

const OrderInfo = ({ order, handleFinishTurn, setIsUpdate, deleteOrder }: props) => {
  const [parsedDeadline, setParsedDeadline] = useState<number>(0);
  const [time, setTime] = useState(parsedDeadline - Date.now());
  const [isShowQR, setIsShowQR] = useState(false);
  const timeRef = useRef(time);
  timeRef.current = time;
  const { totalTime } = order;

  useEffect(() => {
    setParsedDeadline(totalTime);
    setTime(totalTime - Date.now());
  }, [totalTime]);

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      closeQr();
    }
  }, []);
  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
  }, []);

  useEffect(() => {
    const interval = setInterval(
      () => {
        setTime(parsedDeadline - Date.now());
      },
      1000,
      [parsedDeadline],
    );

    return () => clearInterval(interval);
  }, [parsedDeadline]);

  const minuteTime = Math.abs((time / MINUTE) % 60);
  const secondTime = Math.abs((time / SECOND) % 60);

  const showQR = () => {
    setIsShowQR(true);
  };

  const toggleQr = () => {
    setIsShowQR(!isShowQR);
  };

  const closeQr = () => {
    setIsShowQR(false);
  };

  return (
    <>
      <div>
        <span>Turno:{order.turnId} </span>
        <span>Tiempo: {order.estimatedTime}</span>
        <span className={`${time < 0 && styles.isRed}`}>
          {time < 0 ? 'Demora de ' : 'Listo en: '}
          {`${Math.floor(minuteTime)}`.padStart(2, '0')}:{`${Math.floor(secondTime)}`.padStart(2, '0')} min
        </span>
      </div>
      <div>
        <button onClick={showQR} className={styles.orderButton} type='button'>
          <FontAwesomeIcon icon={faQrcode} />
          <span>Código QR</span>
        </button>
        <button onClick={() => handleFinishTurn(order)} className={styles.orderButton} type='button'>
          <FontAwesomeIcon icon={faCheck} />
          <span>Entregar</span>
        </button>
        <button
          onClick={() => {
            setIsUpdate(order);
          }}
          className={styles.orderButton}
          type='button'
        >
          <FontAwesomeIcon icon={faPlus} />
          <span>Agregar tiempo</span>
        </button>
        <button className={styles.orderButton} type='button' onClick={() => deleteOrder(order)}>
          <FontAwesomeIcon icon={faTrash} />
          <span>Eliminar</span>
        </button>
      </div>
      <div>{isShowQR && <QrModal id={order.turnId} toggleModal={toggleQr} />}</div>
    </>
  );
};

export default OrderInfo;
