import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Box, useColorModeValue } from '@chakra-ui/react';
import { AiFillAppstore } from 'react-icons/ai';
import { Dropdown, MenuProps, Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

const ProductSwitcher = () => {
const [t, i18n] = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const items = [
    {
      key: '1',
      label: 'SP Form Mobile',
      image: "/images/product/SPF.png",
      src: 'https://play.google.com/store/apps/details?id=com.sanspaper.form&hl=en&gl=US',
    },
    {
      key: '2',
      label: 'Sans Paper ID Web',
      image: "/images/product/SansPaperID.svg",
      src: 'https://form.sanspaper.com/product',
    },
    {
        key: '3',
        label: 'Sans Paper ID Mobile',
        image: "images/product/SansPaperID.svg",
        src: 'https://play.google.com/store/apps/details?id=com.sanspaper.spi&hl=en&gl=US',
    },
    {
      key: '4',
      label: 'SP Connect Web',
      image: "/images/product/spc.png",
      src: 'https://form.sanspaper.com/product',
    },
    {
        key: '5',
        label: 'SP Connect Mobile',
        image: "/images/product/spc.png",
        src: 'https://play.google.com/store/apps/details?id=com.sanspaper_connect&hl=en&gl=US',
    },
    {
      key: '6',
      label: 'SP Hub',
      image: "/images/product/SPHub.png",
      src: 'https://hub.sanspaper.com/user/login?origin=SPFWEB&clientId=',
    },
  ];                                                                                                                                                                

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  const handleProdClick = (src: string) => {
    window.open(src, '_blank'); 
  };

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const searchItem = {
    key: 'search',
    label: (
      <Input
        placeholder="Search Products"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{ marginBottom: 8 }}
        addonAfter={<SearchOutlined />} 
      />
    ),
    disabled: true, 
  };

  const menuItems: MenuProps['items'] = [
    searchItem,
    ...filteredItems.map(item => ({
      key: item.key,
      label: (
        <div onClick={() => handleProdClick(item.src)}>
          <Space>
            <Image 
            src={item.image} 
            width={60} 
            height={60} 
            alt="Product"/>
            {t(item.label)}
          </Space>
        </div>
      ),
    })),
  ];

  return (
    

    <li className="relative">
        <Dropdown menu={{ items: menuItems }} placement="bottom" arrow>
        <Link
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
        }}
        href="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        <span
          className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${
            notifying === false ? "hidden" : "inline"
          }`}
        >
          <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
        </span>

        <AiFillAppstore size="20px" color={useColorModeValue('gray.900', 'initial')} />
      </Link>
      </Dropdown>

    </li>
  );
};

export default ProductSwitcher;
