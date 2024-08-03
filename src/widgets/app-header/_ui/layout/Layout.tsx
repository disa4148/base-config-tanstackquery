import css from './layout.module.scss';

interface Layout {
  nav?: React.ReactNode;
}

const Layout: React.FC<Layout> = ({ nav }) => {
  return <header className={css.wrapper}>{nav}</header>;
};

export default Layout;
