import { Queue } from "bullmq";
import type { QueueOptions, JobsOptions } from "bullmq";

export class Q {
    private q: Queue;

    constructor(name: string, options: QueueOptions) {
        this.q = new Queue(name, options);
    }

    async enqueue(data: any, options?: JobsOptions) {
        return await this.q.add("job", data, options);
    }

    async enqueueNamed(jobName: string, data: any, options?: JobsOptions) {
        return await this.q.add(jobName, data, options);
    }

    async close() {
        await this.q.close();
    }

    getQueue() {
        return this.q;
    }
}