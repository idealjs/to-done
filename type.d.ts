interface IClassNameProps {
  className?: string;
}

type PropsWithClassName<P = unknown> = P & { className?: string };
