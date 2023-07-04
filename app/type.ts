export interface IClassNameProps {
  className?: string;
}

export type PropsWithClassName<P = unknown> = P & { className?: string };
