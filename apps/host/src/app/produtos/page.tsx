'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Box, Button, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { useState } from 'react'

import { Loading } from '@repo/ui/Loading'
import { useDeleteProduct, useGetProducts } from '@/hooks'
import { useDialog } from '@/hooks/core'

export default function ProdutosPage() {
  const router = useRouter()
  const { addDialog } = useDialog()
  const deleteProductMutation = useDeleteProduct()
  const pageSize = 10
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize })

  const { data, isLoading, isFetching, refetch } = useGetProducts({
    limit: paginationModel.pageSize,
    skip: paginationModel.page * paginationModel.pageSize
  })

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'title', headerName: 'Nome', flex: 1 },
    { field: 'description', headerName: 'Descrição', flex: 1 },
    { field: 'category', headerName: 'Categoria', flex: 1 },
    { field: 'price', headerName: 'Preço', flex: 1 },
    { field: 'stock', headerName: 'Estoque', flex: 1 },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => router.push(`/produtos/${params.row.id}`)}>
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={async () => {
              const id = params.row.id
              if (id) {
                deleteProductMutation.mutate(
                  { id: Number(id) },
                  {
                    onSuccess: () => {
                      addDialog({ type: 'success', message: 'Produto excluído com sucesso!' })
                      refetch()
                    }
                  }
                )
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )
    }
  ]

  return (
    <Box>
      <Loading isLoading={isFetching || deleteProductMutation.isPending} />
      <Box display="flex" justifyContent="space-between" mb={2}>
        <h2 />
        <Button variant="contained" onClick={() => router.push('/produtos/novo')}>
          Novo Produto
        </Button>
      </Box>

      <DataGrid
        rows={data?.products || []}
        columns={columns}
        loading={isLoading}
        rowCount={data?.total || 0}
        paginationMode="server"
        pageSizeOptions={[10]}
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
      />
    </Box>
  )
}
