using System.Collections.Generic;
using CreativeCommand.Models;

namespace CreativeCommand.Repositories
{
    public interface ICampaignStatusRepository
    {
        List<CampaignStatus> GetAllCampaignStatuses();
        CampaignStatus GetCampaignStatusById(int id);
        CampaignStatus GetByCampaignId(int campaignId);
        List<CampaignStatus> GetAllByCampaignId(int campaignId);
        void Add(CampaignStatus campaignStatus);
        void Delete(int id);
        void Update(CampaignStatus campaignStatus);
        List<CampaignStatus> GetAllByCampaignAccountId(int accountId);
    }
}