interface taskProps {
  todo: string;
  position: number;
  id: number;
  remove: (position:number) => void;
  update: (position:number, task:string) => void;
}
