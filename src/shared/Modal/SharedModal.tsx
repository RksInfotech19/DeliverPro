import type{ ReactNode } from "react";
import styles from "./SharedModal.module.css";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    title?: string; 
}

const SharedModal: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        {title && <div className={styles.modalHeader}><h2>{title}</h2></div>}    
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        

        <div className={styles.content}>{children}</div>

              {/* Modal Footer */}
      <div className={styles.modalFooter}>
        <button onClick={onClose}>Close</button>
      </div>
      </div>
    </div>
  );
};

export default SharedModal;
