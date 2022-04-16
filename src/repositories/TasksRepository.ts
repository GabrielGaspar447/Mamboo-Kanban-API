import { AbstractRepository } from '../ts/abstract_classes'
import { ITask } from '../ts/interfaces'

// This is the class that will be used to interact with the "tasks" collection;
// It has the same methods as the abstract Repository class, but it uses the "taskModel" provided as argument to the constructor;
// If needed, we can add additional methods or override the ones from the abstract class (polymorphism).
export class TasksRepository extends AbstractRepository<ITask> {
  public async read (): Promise<ITask[]> { // Here I'm overriding the read method from the abstract class so that we can return sorted tasks.
    return await this.model.find().sort({ boardId: 1, status: 1 })
  }
}
