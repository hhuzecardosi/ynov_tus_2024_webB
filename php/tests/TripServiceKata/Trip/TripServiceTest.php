<?php

namespace tests\TripServiceKata\Trip;

use kata\TripServiceKata\Exception\UserNotLoggedInException;
use kata\TripServiceKata\Trip\ITripDAO;
use kata\TripServiceKata\Trip\Trip;
use kata\TripServiceKata\Trip\TripService;
use kata\TripServiceKata\User\User;
use PHPUnit\Framework\TestCase;

class FakeTripDao implements ITripDAO {
    private $trips = [];

    public function findTripsByUser(User $user)
    {
        return $this->trips;
    }

    public function setTrips(array $trips)
    {
        $this->trips = $trips;
    }
}

class TripServiceOverload extends TripService
{
    public function __construct($tripDao = null)
    {
        parent::__construct($tripDao);
    }

    /**
     * @var User
     */
    private $user = null;
    protected function getLoggedUser()
    {
        return $this->user;
    }

    public function setLoggedUser(User $user)
    {
        $this->user = $user;
    }
}

class TripServiceTest extends TestCase
{
    /**
     * @var TripService
     */
    private $tripService;

    protected function setUp(): void
    {
        $this->tripService = new TripServiceOverload();
    }

    /** @test */
    public function should_throwException_whenUserIsNotLogged()
    {
        $this->expectException(UserNotLoggedInException::class);
        $this->tripService->getTripsByUser(new User('Alice'));
    }

    /** @test */
    public function should_returnEmptyTripList_whenUserHasNoFriend()
    {
        $this->tripService->setLoggedUser(new User('Bob'));
        $result = $this->tripService->getTripsByUser(new User('Alice'));

        $this->assertEmpty($result);
    }

    /** @test */
    public function should_returnEmptyTripList_whenUserIsNotFriendWithCurrentUser()
    {
        // ARRANGE
        $fakeTripDao = new FakeTripDao();
        $this->tripService = new TripServiceOverload($fakeTripDao);

        $this->tripService->setLoggedUser(new User('Bob'));
        $alice = new User('Alice');
        $alice->addFriend(new User('Charlie'));
        $alice->addFriend(new User('David'));

        $tripToRio = new Trip();
        $fakeTripDao->setTrips([$tripToRio]);

        // ACT
        $result = $this->tripService->getTripsByUser($alice);

        // ASSERT
        $this->assertEmpty($result);
    }

    /** @test */
    public function should_returnTripList_whenUserIsFriendWithCurrentUser()
    {
        $fakeTripDao = new FakeTripDao();
        $this->tripService = new TripServiceOverload($fakeTripDao);

        $bob = new User('Bob');
        $this->tripService->setLoggedUser($bob);

        $alice = new User('Alice');
        $alice->addFriend(new User('Charlie'));
        $alice->addFriend($bob);
        $alice->addFriend(new User('David'));

        $tripToRio = new Trip();
        $fakeTripDao->setTrips([$tripToRio]);

        $result = $this->tripService->getTripsByUser($alice);

        $this->assertCount(1, $result);
        $this->assertSame($tripToRio, $result[0]);
    }
}
