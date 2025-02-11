import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClienteService {
    private readonly clienteRepository;
    constructor(clienteRepository: Repository<Cliente>);
    findAll(): Promise<Cliente[]>;
    findOne(id: string): Promise<Cliente>;
    create(createClienteDto: CreateClienteDto): Promise<Cliente>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<Cliente>;
    remove(id: string): Promise<void>;
    buscarDadosCnpj(cnpj: string): Promise<any>;
}
