import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dealer, DealerDocument } from './schemas/dealer.schema';
import { Employee, EmployeeDocument } from './schemas/employee.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Dealer.name) private dealerModel: Model<DealerDocument>,
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
  ) {}

  async createDealer(dealerDto: any): Promise<Dealer> {
    const createdDealer = new this.dealerModel(dealerDto);
    return createdDealer.save();
  }

  async createEmployee(employeeDto: any): Promise<Employee> {
    const createdEmployee = new this.employeeModel(employeeDto);
    return createdEmployee.save();
  }

  async getAllDealers(): Promise<Dealer[]> {
    return this.dealerModel.find().exec();
  }

  async checkAvailability(shopname: string): Promise<boolean[]> {
    const dealer = await this.dealerModel.findOne({ shopname }).exec();
    if (!dealer) {
      throw new NotFoundException(`Dealer with shopname ${shopname} not found`);
    }

    const availabilityArray = Array(10).fill(false);

    const employees = await this.employeeModel
      .find({ id: { $in: dealer.employee_arr_id } })
      .exec();

    employees.forEach(employee => {
      employee.car_slot.forEach((slot, index) => {
        if (slot === '') {
          availabilityArray[index] = true;
        }
      });
    });

    return availabilityArray;
  }

  async reserveSlot(shopname: string, time_idx: number): Promise<string> {
    const dealer = await this.dealerModel.findOne({ shopname }).exec();
    if (!dealer) {
      throw new NotFoundException(`Dealer with shopname ${shopname} not found`);
    }

    const employees = await this.employeeModel
      .find({ id: { $in: dealer.employee_arr_id } })
      .exec();

    for (const employee of employees) {
      if (employee.car_slot[time_idx] === '') {
        // temporary hard-code (state will be delivered via frontend state)
        employee.car_slot[time_idx] = 'TUCSON';

        await employee.save();
        return `Slot reserved successfully at time ${time_idx} for shop ${shopname}`;
      }
    }

    throw new ConflictException('No available slots left. Someone else have reserved the slot.');
  }

  async resetDatabase(): Promise<void> {
    // reset
    await this.dealerModel.deleteMany({});
    await this.employeeModel.deleteMany({});

    // batch insert
    const employees = [
      { id: 1, car_slot: Array(10).fill('') },
      { id: 2, car_slot: Array(10).fill('') },
      { id: 3, car_slot: Array(10).fill('') },
      { id: 4, car_slot: Array(10).fill('') },
      { id: 5, car_slot: Array(10).fill('') },
      { id: 6, car_slot: ['', '', 'IONIQ 5', '', '', 'KONA', '', '', '', ''] },
      { id: 7, car_slot: ['', '', 'IONIQ 5', '', '', 'KONA', '', '', '', ''] },
      { id: 8, car_slot: ['', '', 'IONIQ 5', '', '', 'KONA', '', '', '', ''] },
      { id: 9, car_slot: ['', '', '', 'IONIQ 5', 'IONIQ 5', '', '', '', '', ''] },
      { id: 10, car_slot: ['', '', '', 'IONIQ 5', 'IONIQ 5', '', '', '', '', ''] },
      { id: 11, car_slot: ['KONA', 'KONA', '', '', '', '', '', '', '', ''] },
      { id: 12, car_slot: ['KONA', 'KONA', '', '', '', '', '', '', '', ''] },
      { id: 13, car_slot: ['KONA', 'KONA', '', '', '', '', '', '', '', ''] },
      { id: 14, car_slot: ['KONA', 'KONA', '', '', '', '', '', '', '', ''] },
      { id: 15, car_slot: ['KONA', 'KONA', '', '', '', '', '', '', '', ''] },
    ];
    await this.employeeModel.insertMany(employees);

    const dealers = [
      {
        shopname: 'AUTO ROMA S.C.V',
        country: 'Italy',
        address: 'Via Aurelia Vecchia 54, 00058 Roma',
        telephone: '+39 06 77294833',
        email: 'acm@autoroma.it',
        weburl: 'https://romahyu.hyundai.it',
        longitude: '11.9119',
        latitude: '42.0409',
        employee_arr_id: [1, 2, 3, 4, 5],
      },
      {
        shopname: 'AUTO ROYALL COMPANY S.R.L',
        country: 'Italy',
        address: 'Via Tiburtina 23, 00156 Roma',
        telephone: '+39 06 87201513',
        email: 'crm@autoroyal.it',
        weburl: 'https://onlyhyu.hyundai.it',
        longitude: '12.4822',
        latitude: '41.8967',
        employee_arr_id: [6, 7, 8, 9, 10],
      },
      {
        shopname: 'AUTOGEPY S.P.A',
        country: 'Italy',
        address: 'Via Castelli Romani 33, 00040 Roma',
        telephone: '+39 06 91101919',
        email: 'cm@autogepy.it',
        weburl: 'https://autohyu.hyundai.it',
        longitude: '12.5026',
        latitude: '41.6803',
        employee_arr_id: [11, 12, 13, 14, 15],
      },
    ];
    await this.dealerModel.insertMany(dealers);
  }
}
