'use client'

import { Box, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { productsSchema } from './formAddEditProduct.definitions'
import { ProductFormProps } from './formAddEditProduct.types'

export function FormAddEditProduct({ defaultValues, onSubmit }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(productsSchema),
    defaultValues
  })

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} maxWidth={400}>
      <TextField label="Nome" fullWidth margin="normal" {...register('title')} error={!!errors.title} helperText={errors.title?.message as string} />

      <TextField
        label="Descrição"
        fullWidth
        margin="normal"
        {...register('description')}
        error={!!errors.description}
        helperText={errors.description?.message as string}
      />

      <TextField label="Preço" fullWidth margin="normal" {...register('price')} error={!!errors.price} helperText={errors.price?.message as string} />

      <TextField
        label="Estoque"
        fullWidth
        margin="normal"
        {...register('stock')}
        error={!!errors.price}
        helperText={errors.price?.message as string}
      />

      <Button variant="contained" type="submit" sx={{ mt: 2 }}>
        Salvar
      </Button>
    </Box>
  )
}
