import  Bee  from 'bee-queue';
import ConfirmationMail from '../app/jobs/ConfirmationMail';
import redisConfig from '../config/redis';


class Queue {
	constructor(){
		this.queues = {};
		this.jobs = [ConfirmationMail];
		this.init();
	}
	init(){
		this.jobs.forEach( job => {
			const {key, handle} = job;

			this.queues[key] = {
				bee: new Bee(key, {
					redis: redisConfig,
				}),
				handle,
			};
		});
	}
	add(queue, job){
		return this.queues[queue].bee.createJob(job).save();
	}
	execute(){
		this.jobs.forEach(job => {
			const {bee, handle} = this.queues[job.key];
			bee.on('failed', this.handleFailure).process(handle);
		})
	}
	handleFailure(job, err) {
		console.log(`Queue ${job.queue.name}: FAILED`, err);
	}

}

export default new Queue();