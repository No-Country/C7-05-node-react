import React, { useEffect, useState } from 'react';
import QR from 'qrcode';
import styles from './styles/modals.module.css'

interface IProps {
  qrCode:string
}

const QrImage: React.FC<IProps> = (props: IProps) => {

  const [qr,setQr] = useState('1') // useState(props.qrCode) 
   
  const [mockQr,setMockQr] = useState<string>('1');

  useEffect( () => {
    if (qr){
      QR.toDataURL(window.location.origin+'/client/'+1, (err,code:string) => { // http://localhost:3000/order/1
        if (err) return console.log('Error en el qr');
        setQr(code)
      })
    }else{
      QR.toDataURL(window.location.origin+'/client/'+1, (err,code:string) => { // http://localhost:3000/order/1
        if (err) return console.log('Error en el qr');
        setMockQr(code)
      })
    }
  })

  

  return(
    <>
    <div className={styles.qrModal}>
      <h2>Pedido creado con éxito</h2>
      <img className={styles.qrImg} src={`${qr ? qr : mockQr}`} aria-label='escanear qr'/>
    </div>
      
    </>
  )

  
}


export default QrImage;