interface taskProps {
  todo: string;
  id: number;
  remove: (position: number) => void;
  update: (position: number, task: string) => void;
  updateCheck: (value: boolean, id: number) => void;
  checked?: boolean;
}
