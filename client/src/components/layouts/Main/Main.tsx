import './Main.scss';

interface MainProps {
  children: JSX.Element[] | JSX.Element;
}

export default function Main({ children }: MainProps) {
  return <main>{children}</main>;
}
