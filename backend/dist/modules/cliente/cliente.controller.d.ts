import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    findAll(): Promise<import("./cliente.entity").Cliente[]>;
    findOne(id: string): Promise<import("./cliente.entity").Cliente>;
    create(createClienteDto: CreateClienteDto): Promise<import("./cliente.entity").Cliente>;
    update(id: string, updateClienteDto: UpdateClienteDto): Promise<import("./cliente.entity").Cliente>;
    remove(id: string): Promise<void>;
}
