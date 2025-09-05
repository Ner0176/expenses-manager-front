import { Modal } from "../base";
import { useSearchParams } from "react-router-dom";
import { ITransaction } from "./transaction.interface";

export const TransactionDetails = ({
  transaction,
}: Readonly<{ transaction: ITransaction }>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { title, amount, category, description } = transaction;

  const handleCloseModal = () => {
    searchParams.delete("modal");
    setSearchParams(searchParams);
  };

  return (
    <Modal title={"Detalle de transacción"} handleClose={handleCloseModal}>
      <div className="flex flex-col gap-2 border border-neutral-200 rounded-2xl py-2.5 px-4">
        <span className="text-lg font-semibold">{title}</span>
        <span className="text-neutral-500 text-sm">{description}</span>
        <div className="flex flex-row justify-between items-center">
          <span>Importe</span>
          <span>{amount}€</span>
        </div>
        <div className="flex flex-row justify-between items-center">
          <span>Categoría</span>
          <span>{category}</span>
        </div>
      </div>
    </Modal>
  );
};
