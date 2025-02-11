import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import axios from 'axios';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async findAll(): Promise<Cliente[]> {
    return await this.clienteRepository.find();
  }

  async findOne(id: string): Promise<Cliente> {
    return await this.clienteRepository.findOne({ where: { id: parseInt(id) } });
  }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = this.clienteRepository.create(createClienteDto);
    return await this.clienteRepository.save(cliente);
  }

  async update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente> {
    await this.clienteRepository.update(id, updateClienteDto);
    return await this.clienteRepository.findOne({ where: { id: parseInt(id) } });
  }

  async remove(id: string): Promise<void> {
    await this.clienteRepository.delete(id);
  }

  async buscarDadosCnpj(cnpj: string): Promise<any> {
    const response = await axios.get(`https://www.cnpj.ws/cnpj/${cnpj}`);
    return response.data;
  }
}
