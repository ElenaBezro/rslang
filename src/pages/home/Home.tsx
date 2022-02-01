import { useTranslation } from 'react-i18next';

const Home = () => {
  const { t } = useTranslation();
  return <div>{t('HOME.TITLE')}</div>;
};

export { Home };
