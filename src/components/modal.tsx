import { useContext } from 'react';
import { Context } from '../context/context';
import { Product } from '../types/product';
import "../assets/modal.css"

const Modal = () => {
    const {setShowModal, showModal} = useContext(Context);
    const onClose = () => setShowModal({...showModal, value: false});

    if (!showModal.value) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    {showModal.title && <p className="modal-title">{showModal.title}</p>}
                    {showModal.description && <p className="modal-description">{showModal.description}</p>}

                    <div className="modal-data-wrapper">
                        {showModal.data.map((item: Product, index) => {
                            return (
                                <div key={index} className="modal-data-container">
                                     <div className="cart-product-image">
                                        <img src={item.imageUrl} alt={item.productName} />
                                    </div>
                                    <p>{item.productName}</p>
                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="close-container">
                        <button className="close" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;