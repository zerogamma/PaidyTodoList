interface taskProps {
  todo: string;
  position: number;
  remove: (position:number) => void;
  update: (position:number, task:string) => void;
}
