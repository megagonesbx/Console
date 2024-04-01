import { DataSource } from "typeorm";
import { NotificationData, BaseRepository } from "../database";

export class NotificationService {
  private readonly notificationRepository;

  constructor(datasource: DataSource) {
    this.notificationRepository = new BaseRepository.default(
      datasource,
      NotificationData
    );
  }

  async insertRecord(notification: Partial<NotificationData>) {
    try {
      const { identifiers } = await this.notificationRepository.insert(
        notification
      );
      const { id } = identifiers[0];
      if (!id || +id <= 0) return 0;

      return id;
    } catch (error) {
      console.log(error);
      return 0;
    }
  }

  async getRecords(email: string) {
    try {
      const where = {
        user: email,
        deleted: false,
      };

      const data = await this.notificationRepository.findAll(
        where,
        { createdAt: "DESC" },
        ["id", "message", "createdAt", "viewed", "type"]
      );

      if (!data.length) return null;

      return data;
    } catch (error) {
      throw error;
    }
  }

  async setViewed(id: number) {
    try {
      await this.notificationRepository.update({ id }, { viewed: true });
      return true;
    } catch (error) {
      return false;
    }
  }

  async setDeleted(id: number) {
    try {
      await this.notificationRepository.update({ id }, { deleted: true });
      return true;
    } catch (error) {
      return false;
    }
  }
}
