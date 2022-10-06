import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setTurn } from '@/redux/slices/clientTurnSlice';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OneSignal from 'react-onesignal';
import CountDown from './components/CountDown';
import ModalDialog from './components/ModalDialog';
import OrderFinished from './components/OrderFinished';
import { turnService } from './services/turn';
import styles from './styles/client.module.css';

export default function Client() {
  const [isOpen, setIsOpen] = useState(true);
  const [turnFinished, setTurnFinished] = useState<any>(false);
  const { turnId } = useParams();
  const dispatch = useAppDispatch();
  const turn = useAppSelector((state) => state.ClientTurn);

  useEffect(() => {
    const handleTabClose = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  useEffect(() => {
    turnId &&
      turnService(turnId).then((turn) => {
        turn && dispatch(setTurn(turn));
      });
  }, []);

  useEffect(() => {
    OneSignal.init({
      appId: '560e5ab2-9ceb-4379-8cef-545851f0b9e9',
      allowLocalhostAsSecureOrigin: false,
      // eslint-disable-next-line camelcase
      safari_web_id: 'web.onesignal.auto.2473987d-7114-4e84-8494-f768208d432f',
      notifyButton: {
        enable: true,
      },
    });
  }, []);

  return (
    <div className={styles.client_Container}>
      {turn.turnId ? (
        <>
          {turnFinished ? (
            <OrderFinished />
          ) : (
            <>
              <h2>Su orden estara lista en</h2>
              <CountDown />
            </>
          )}
          <div className={styles.client_turnInfo}>
            <p>
              <strong>Turno ID:</strong> {turn?.turnId}
            </p>
          </div>
        </>
      ) : (
        <></>
      )}

      {isOpen && <ModalDialog setIsOpen={setIsOpen} />}
    </div>
  );
}
