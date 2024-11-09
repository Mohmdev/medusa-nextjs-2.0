import React, { useState } from "react"
import { Spinner, Trash } from "@medusajs/icons"
import { deleteLineItem } from "@/lib/data/cart"
import { cn } from "@/lib/utils/cn"

const DeleteButton = ({
  id,
  children,
  className,
}: {
  id: string
  children?: React.ReactNode
  className?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between text-small-regular",
        className
      )}
    >
      <button
        className="flex cursor-pointer gap-x-1 text-ui-fg-subtle hover:text-ui-fg-base"
        onClick={() => handleDelete(id)}
      >
        {isDeleting ? <Spinner className="animate-spin" /> : <Trash />}
        <span>{children}</span>
      </button>
    </div>
  )
}

export default DeleteButton
