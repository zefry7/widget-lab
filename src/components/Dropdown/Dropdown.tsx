import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';

interface DropdownProps {
  list: string[];
  onSelect: (v: string) => void;
  label?: string;
}

const Dropdown: FC<DropdownProps> = ({ label, list, onSelect }) => {
  const [open, setOpen] = useState(false);
  const items = list.map((v, i) => ({ id: i, name: v }));
  const [selectedItem, setSelectedItem] = useState(items[0].name);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectItem = useCallback(
    (id) => () => {
      const selectedName = items.find((v) => v.id == id).name;
      setSelectedItem(selectedName);
      setOpen(false);
      onSelect(selectedName);
    },
    []
  );

  return (
    <div className={styles.wrapper} ref={ref}>
      {label && <p className={styles.label}>{label}</p>}
      <div className={styles.input} onClick={() => setOpen((v) => !v)}>
        <p className={styles.input_text}>{selectedItem}</p>
      </div>
      {open && (
        <div className={styles.list}>
          <div className={styles.list_content}>
            {items.map((item) => (
              <p key={item.id} className={styles.list_item} onClick={handleSelectItem(item.id)}>
                {item.name}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
